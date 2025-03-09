from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .serializers import UserSerializer, TestSerialiser
from base.models import Test
import json

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class= MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register',
        '/api/tests',
        '/api/questions',
    ]

    return Response(routes)

@api_view(['POST'])
def registerUser(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getTests(request):
    tests = Test.objects.all()
    serialized_data = []

    for test in tests:
        serializer = TestSerialiser(test)
        serialized_data.append({**serializer.data, 'image_url': f"{request.build_absolute_uri(test.image.url)}"})

    return Response(serialized_data)

@api_view(['POST'])
def getQuestions(request):
    data = json.loads(request.body)
    url = data.get('url')
    test_data = Test.objects.get(url=url)
    serializer = TestSerialiser(test_data)
    return Response(serializer.data)

    


