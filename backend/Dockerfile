FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["BackendAPI.csproj", "./"]
RUN dotnet restore "BackendAPI.csproj"

# Copy everything else and build
COPY . .
RUN dotnet publish "BackendAPI.csproj" -c Release -o /app/publish

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "BackendAPI.dll"]
