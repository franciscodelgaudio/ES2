# ====== build (JDK 25 + Maven via apt) ======
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
# instalar maven do repositório da distro
RUN apt-get update && apt-get install -y --no-install-recommends maven && rm -rf /var/lib/apt/lists/*
COPY pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

# ====== runtime (JRE 25) ======
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV SERVER_PORT=8080
EXPOSE 8080
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 -XX:+UseContainerSupport"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
