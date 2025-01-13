FROM python:3.11.0-slim

WORKDIR /mnt/locust

RUN pip3 install poetry

COPY pyproject.toml poetry.lock ./
COPY locustfile.py .

RUN poetry install --no-interaction --no-ansi || true

EXPOSE 8089

ENTRYPOINT ["poetry", "run", "locust"]
CMD ["--host", "${TARGET_HOST:-http://backend_lb}"]