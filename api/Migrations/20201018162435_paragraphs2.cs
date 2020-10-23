using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class paragraphs2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AraiParagraph",
                table: "Texts",
                newName: "ArabicParagraph");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ArabicParagraph",
                table: "Texts",
                newName: "AraiParagraph");
        }
    }
}
