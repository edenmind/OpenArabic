using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class SentenceOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                "Order",
                "Sentences",
                "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "Order",
                "Sentences");
        }
    }
}