# Step 1: Build the backend
FROM maven:3.8.5-openjdk-17 AS build
# This line tells Docker to move into your backend folder
WORKDIR /app
COPY ims-backend /app/ims-backend
WORKDIR /app/ims-backend
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy the built jar from the backend target folder
COPY --from=build /app/ims-backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
