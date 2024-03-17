using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiddingService.Migrations
{
    /// <inheritdoc />
    public partial class updateMg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Bids",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Bids");
        }
    }
}
