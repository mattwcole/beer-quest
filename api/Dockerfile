FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY *.sln .
COPY BeerQuestApi/*.csproj BeerQuestApi/
COPY BeerQuestApi.Tests/*.csproj BeerQuestApi.Tests/
RUN dotnet restore
COPY BeerQuestApi/. BeerQuestApi/
COPY BeerQuestApi.Tests/. BeerQuestApi.Tests/
RUN dotnet test -c Release && dotnet publish BeerQuestApi -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /src/out .
ENTRYPOINT ["dotnet", "BeerQuestApi.dll"]
