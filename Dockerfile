# Stage 1: Build the backend project
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app
# Copy the entire project to ensure all folders are present
COPY . .
# Navigate into the actual backend folder where pom.xml lives
WORKDIR /app/ims-backend
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre
WORKDIR /app
# Copy the built jar from the nested target folder
COPY --from=build /app/ims-backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
