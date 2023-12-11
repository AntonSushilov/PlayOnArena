from rest_framework.pagination import PageNumberPagination


class LimitedPagePagination(PageNumberPagination):
    page_size_query_param = 'limit'
