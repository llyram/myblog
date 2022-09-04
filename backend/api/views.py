import code
from .models import Post
from .serializers import PostDetailSerializer, PostSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
    queryset = Post.objects.all()
    serializer = PostSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPost(request, code):
    post = Post.objects.get(code=code)

    serializer = PostDetailSerializer(post)

    return Response(serializer.data)