FROM gradle AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle bootJar --no-daemon

FROM openjdk:17-jdk-alpine
ARG DEPENDENCY=/home/gradle/src/build/libs
COPY --from=build ${DEPENDENCY}/*.jar app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app/app.jar"]