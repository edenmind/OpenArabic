using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "Texts",
                table => new
                {
                    TextId = table.Column<long>("bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>("nvarchar(max)", nullable: true),
                    Author = table.Column<string>("nvarchar(max)", nullable: true),
                    Editor = table.Column<string>("nvarchar(max)", nullable: true),
                    Source = table.Column<string>("nvarchar(max)", nullable: true),
                    Category = table.Column<string>("nvarchar(max)", nullable: true),
                    Status = table.Column<string>("nvarchar(max)", nullable: true),
                    ArabicText = table.Column<string>("nvarchar(max)", nullable: true),
                    EnglishText = table.Column<string>("nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>("datetime2", nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_Texts", x => x.TextId); });

            migrationBuilder.CreateTable(
                "Sentences",
                table => new
                {
                    SentenceId = table.Column<long>("bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    English = table.Column<string>("nvarchar(max)", nullable: true),
                    Arabic = table.Column<string>("nvarchar(max)", nullable: true),
                    TextId = table.Column<long>("bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sentences", x => x.SentenceId);
                    table.ForeignKey(
                        "FK_Sentences_Texts_TextId",
                        x => x.TextId,
                        "Texts",
                        "TextId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                "Words",
                table => new
                {
                    WordId = table.Column<long>("bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    English = table.Column<string>("nvarchar(max)", nullable: true),
                    Arabic = table.Column<string>("nvarchar(max)", nullable: true),
                    SentenceId = table.Column<long>("bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Words", x => x.WordId);
                    table.ForeignKey(
                        "FK_Words_Sentences_SentenceId",
                        x => x.SentenceId,
                        "Sentences",
                        "SentenceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                "IX_Sentences_TextId",
                "Sentences",
                "TextId");

            migrationBuilder.CreateIndex(
                "IX_Words_SentenceId",
                "Words",
                "SentenceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Words");

            migrationBuilder.DropTable(
                "Sentences");

            migrationBuilder.DropTable(
                "Texts");
        }
    }
}