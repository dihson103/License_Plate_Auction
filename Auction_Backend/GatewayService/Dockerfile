FROM mcr.microsoft.com/dotnet/sdk:6.0 as build
WORKDIR /app
EXPOSE 80

COPY Auction_Backend/Auction_Backend.sln Auction_Backend/Auction_Backend.sln
COPY Auction_Backend/AccountService/AccountService.csproj Auction_Backend/AccountService/AccountService.csproj
COPY Auction_Backend/AuctionService/AuctionService.csproj Auction_Backend/AuctionService/AuctionService.csproj
COPY Auction_Backend/BiddingService/BiddingService.csproj Auction_Backend/BiddingService/BiddingService.csproj
COPY Auction_Backend/Contracts/Contracts.csproj Auction_Backend/Contracts/Contracts.csproj
COPY Auction_Backend/GatewayService/GatewayService.csproj Auction_Backend/GatewayService/GatewayService.csproj
COPY Auction_Backend/JwtAuthenticationManager/JwtAuthenticationManager.csproj Auction_Backend/JwtAuthenticationManager/JwtAuthenticationManager.csproj
COPY Auction_Backend/NotificationService/NotificationService.csproj Auction_Backend/NotificationService/NotificationService.csproj
COPY Auction_Backend/PaymentService/PaymentService.csproj Auction_Backend/PaymentService/PaymentService.csproj
COPY Auction_Backend/RedisManager/RedisManager.csproj Auction_Backend/RedisManager/RedisManager.csproj
COPY Auction_Backend/SearchService/SearchService.csproj Auction_Backend/SearchService/SearchService.csproj

RUN dotnet restore Auction_Backend/Auction_Backend.sln

COPY Auction_Backend/GatewayService Auction_Backend/GatewayService
COPY Auction_Backend/RedisManager Auction_Backend/RedisManager
COPY Auction_Backend/JwtAuthenticationManager Auction_Backend/JwtAuthenticationManager
WORKDIR /app/Auction_Backend/GatewayService
RUN dotnet publish -c Release -o /app/Auction_Backend/out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/Auction_Backend/out .
ENTRYPOINT [ "dotnet", "GatewayService.dll" ]