# Use an official OpenJDK runtime as the base image
FROM eclipse-temurin:21-jdk AS build 

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","backend.jar"]



# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the host to the working directory in the container
COPY target/your-app.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
