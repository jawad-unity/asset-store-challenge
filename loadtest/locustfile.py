import os
from locust import HttpUser, task, constant_throughput
from dotenv import load_dotenv
load_dotenv()

# front-end load test
# class UserBehavior(HttpUser):
#     wait_time = constant_throughput(1) # 1 request per second per user
#     @task(2)
#     def get_products(self):
#         self.client.get("/")
#     @task(1)
#     def get_product(self):
#         self.client.get("/products/46172")

# back-end load test
class ProductsApi(HttpUser):
    wait_time = constant_throughput(1) # 1 request per second per user
    @task(3)
    def get_products(self):
        self.client.get("/api/products", headers={"Authorization": "Bearer " + os.getenv("AUTH_TOKEN")})
    @task
    def get_product(self):
        self.client.get("/api/products/46172", headers={"Authorization": "Bearer " + os.getenv("AUTH_TOKEN")})
