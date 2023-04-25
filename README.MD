### Start project
```docker compose up```

### Connect to proxysql container
```docker exec -it proxysql-1  /bin/bash ```

### Connect to proxysql client inside container
```mysql -u admin -padmin -h 127.0.0.1 -P6032 --prompt='Admin> '```
