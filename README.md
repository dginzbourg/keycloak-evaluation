# Start keycloak
```
docker run -d --name keycloak_postgres --net keycloak-network -e POSTGRES_DB=keycloak -e POSTGRES_USER=keycloak -e POSTGRES_PASSWORD=keycloak -p 6432:5432 postgres:10.7
```
```
docker run --rm --name keycloak --net keycloak-network  -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DB_ADDR=keycloak_postgres -e DB_PORT=5432 -e DB_USER=keycloak -e DB_PASSWORD=keycloak -p 10090:9990 -p 8180:8080 -e  KEYCLOAK_STATISTICS=all -e DB_VENDOR=postgres -e DB_DATABASE=keycloak  -v "$PWD":/home   jboss/keycloak -Djava.io.tmpdir=/home   -Dkeycloak.profile.feature.scripts=enabled -Dkeycloak.profile.feature.upload_scripts=enabled  -Djboss.socket.binding.port-offset=0
```
Suggest running DB with persistency (no --rm) to keep your configuration.


# Retrieve token for specific user
```
access_token=`curl --data "grant_type=password&client_id=hdap&username=asu1&password=asu1&client_secret=secret" http://localhost:8180/auth/realms/ex1/protocol/openid-connect/token|jq -r .access_token`
```
```
curl -X GET -H "Authorization: Bearer $access_token" http://localhost:3000/accounts/10/extensions ; 
curl -X GET -H "Authorization: Bearer $access_token" http://localhost:3000/accounts/10/extensions/1 ; 
curl -X POST -H "Authorization: Bearer $access_token" http://localhost:3000/accounts/10/extensions
```
