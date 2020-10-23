using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class paragraphs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AraiParagraph",
                table: "Texts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnglishParagraph",
                table: "Texts",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AraiParagraph",
                table: "Texts");

            migrationBuilder.DropColumn(
                name: "EnglishParagraph",
                table: "Texts");
        }
    }
}
