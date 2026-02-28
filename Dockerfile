# Step 1: Build the backend
FROM maven:3.8.1-openjdk-17-slim AS build
WORKDIR /app
# Copy the backend folder from your repo
COPY ims-backend /app/ims-backend
WORKDIR /app/ims-backend
# Build the jar
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM openjdk:17-slim
WORKDIR /app
# Copy the built jar from the build stage
COPY --from=build /app/ims-backend/target/*.jar app.jar
EXPOSE 8080
# Standard command to run the jar
CMD ["java", "-jar", "app.jar"]
