# Stage 1: Build the backend
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app
# Copy the backend folder from your repo
COPY ims-backend /app/ims-backend
WORKDIR /app/ims-backend
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/ims-backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
