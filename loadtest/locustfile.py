from locust import HttpUser, task, constant_throughput

class Products(HttpUser):
    wait_time = constant_throughput(1) # 1 request per second
    @task
    def get_products(self):
        self.client.get("/api/products", headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFzc2V0LXN0b3JlLWNoYWxsZW5nZSIsImlhdCI6MTUxNjIzOTAyMn0.FKFJIMekQ5Hrb18x3Dalrg4hHNSBeHQ3kD60cxfaEHY"})
