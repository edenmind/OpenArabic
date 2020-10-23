using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class paragraphs3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sentences_Texts_TextId",
                table: "Sentences");

            migrationBuilder.AlterColumn<long>(
                name: "TextId",
                table: "Sentences",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Sentences_Texts_TextId",
                table: "Sentences",
                column: "TextId",
                principalTable: "Texts",
                principalColumn: "TextId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sentences_Texts_TextId",
                table: "Sentences");

            migrationBuilder.AlterColumn<long>(
                name: "TextId",
                table: "Sentences",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Sentences_Texts_TextId",
                table: "Sentences",
                column: "TextId",
                principalTable: "Texts",
                principalColumn: "TextId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
