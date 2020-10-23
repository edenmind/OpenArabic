using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Texts",
                columns: table => new
                {
                    TextId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Texts", x => x.TextId);
                });

            migrationBuilder.CreateTable(
                name: "Sentences",
                columns: table => new
                {
                    SentenceId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    English = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Arabic = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sentences", x => x.SentenceId);
                    table.ForeignKey(
                        name: "FK_Sentences_Texts_TextId",
                        column: x => x.TextId,
                        principalTable: "Texts",
                        principalColumn: "TextId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sentences_TextId",
                table: "Sentences",
                column: "TextId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sentences");

            migrationBuilder.DropTable(
                name: "Texts");
        }
    }
}
