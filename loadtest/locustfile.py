from locust import HttpUser, task, constant_throughput

class Products(HttpUser):
    wait_time = constant_throughput(1) # 1 request per second
    @task
    def get_products(self):
        self.client.get("/api/products", headers={"Authorization": "Bearer todo_token"})
