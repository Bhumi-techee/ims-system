# Stage 1: Build the backend project
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
# Copy only the backend folder from your GitHub repo
COPY ims-backend /app/ims-backend
WORKDIR /app/ims-backend
# Run the build to create the JAR file
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-slim
WORKDIR /app
# Copy the built jar from the previous stage
COPY --from=build /app/ims-backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
