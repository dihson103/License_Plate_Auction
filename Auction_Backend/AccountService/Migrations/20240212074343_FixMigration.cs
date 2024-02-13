using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccountService.Migrations
{
    /// <inheritdoc />
    public partial class FixMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_Admins_AdminAccountId",
                table: "Tokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_Users_UserAccountId",
                table: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Tokens_AdminAccountId",
                table: "Tokens");

            migrationBuilder.DropColumn(
                name: "AdminAccountId",
                table: "Tokens");

            migrationBuilder.RenameColumn(
                name: "UserAccountId",
                table: "Tokens",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tokens_UserAccountId",
                table: "Tokens",
                newName: "IX_Tokens_UserId");

            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "Tokens",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_AdminId",
                table: "Tokens",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_Admins_AdminId",
                table: "Tokens",
                column: "AdminId",
                principalTable: "Admins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_Users_UserId",
                table: "Tokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_Admins_AdminId",
                table: "Tokens");

            migrationBuilder.DropForeignKey(
                name: "FK_Tokens_Users_UserId",
                table: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Tokens_AdminId",
                table: "Tokens");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Tokens");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Tokens",
                newName: "UserAccountId");

            migrationBuilder.RenameIndex(
                name: "IX_Tokens_UserId",
                table: "Tokens",
                newName: "IX_Tokens_UserAccountId");

            migrationBuilder.AddColumn<int>(
                name: "AdminAccountId",
                table: "Tokens",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_AdminAccountId",
                table: "Tokens",
                column: "AdminAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_Admins_AdminAccountId",
                table: "Tokens",
                column: "AdminAccountId",
                principalTable: "Admins",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tokens_Users_UserAccountId",
                table: "Tokens",
                column: "UserAccountId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
