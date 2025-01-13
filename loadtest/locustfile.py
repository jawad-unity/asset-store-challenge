from locust import HttpUser, task

class Products(HttpUser):
    @task
    def get_products(self):
        self.client.get("/api/products", headers={"Authorization": "Bearer todo_token"})
