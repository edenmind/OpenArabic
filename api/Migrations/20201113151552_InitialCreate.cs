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
                    Editor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ArabicText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnglishText = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    TextId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sentences", x => x.SentenceId);
                    table.ForeignKey(
                        name: "FK_Sentences_Texts_TextId",
                        column: x => x.TextId,
                        principalTable: "Texts",
                        principalColumn: "TextId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Words",
                columns: table => new
                {
                    WordId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    English = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Arabic = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SentenceId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Words", x => x.WordId);
                    table.ForeignKey(
                        name: "FK_Words_Sentences_SentenceId",
                        column: x => x.SentenceId,
                        principalTable: "Sentences",
                        principalColumn: "SentenceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sentences_TextId",
                table: "Sentences",
                column: "TextId");

            migrationBuilder.CreateIndex(
                name: "IX_Words_SentenceId",
                table: "Words",
                column: "SentenceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Words");

            migrationBuilder.DropTable(
                name: "Sentences");

            migrationBuilder.DropTable(
                name: "Texts");
        }
    }
}
