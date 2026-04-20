# Stage 1: Build com Maven
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY backend/pom.xml .
# Baixa dependências primeiro (cache do Docker acelera builds futuros)
RUN mvn dependency:go-offline -B
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime com JRE (imagem menor)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]