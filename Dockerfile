# Stage 1: Build the backend project
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app
# Copy the backend folder from your repo
COPY ims-backend /app/ims-backend
WORKDIR /app/ims-backend
# Run the maven build
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the built jar from the previous stage
COPY --from=build /app/ims-backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
