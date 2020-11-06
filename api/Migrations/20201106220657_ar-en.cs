using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class aren : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Arabic",
                table: "Words",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "English",
                table: "Words",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Arabic",
                table: "Words");

            migrationBuilder.DropColumn(
                name: "English",
                table: "Words");
        }
    }
}
