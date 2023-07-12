using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FindProfessor.DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class usluga_profesorId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Usluge_ProfesorId",
                table: "Usluge",
                column: "ProfesorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Usluge_Profesor_ProfesorId",
                table: "Usluge",
                column: "ProfesorId",
                principalTable: "Profesor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usluge_Profesor_ProfesorId",
                table: "Usluge");

            migrationBuilder.DropIndex(
                name: "IX_Usluge_ProfesorId",
                table: "Usluge");
        }
    }
}
