using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FindProfessor.DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class izmena_atributa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admini_Korisnici_KorisnikID",
                table: "Admini");

            migrationBuilder.DropForeignKey(
                name: "FK_Profesor_Korisnici_KorisnikID",
                table: "Profesor");

            migrationBuilder.DropForeignKey(
                name: "FK_Termini_Profesor_ProfesorKorisnikID",
                table: "Termini");

            migrationBuilder.DropForeignKey(
                name: "FK_Ucenik_Korisnici_KorisnikID",
                table: "Ucenik");

            migrationBuilder.RenameColumn(
                name: "UslugaId",
                table: "Usluge",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KorisnikID",
                table: "Ucenik",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ProfesorKorisnikID",
                table: "Termini",
                newName: "ProfesorId");

            migrationBuilder.RenameIndex(
                name: "IX_Termini_ProfesorKorisnikID",
                table: "Termini",
                newName: "IX_Termini_ProfesorId");

            migrationBuilder.RenameColumn(
                name: "RecenzijaId",
                table: "Recenzije",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Ocena",
                table: "Profesor",
                newName: "ProsecnaOcena");

            migrationBuilder.RenameColumn(
                name: "Cena",
                table: "Profesor",
                newName: "CenaPoSatu");

            migrationBuilder.RenameColumn(
                name: "KorisnikID",
                table: "Profesor",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KorisnikID",
                table: "Korisnici",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KorisnikID",
                table: "Admini",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Admini_Korisnici_Id",
                table: "Admini",
                column: "Id",
                principalTable: "Korisnici",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Profesor_Korisnici_Id",
                table: "Profesor",
                column: "Id",
                principalTable: "Korisnici",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Termini_Profesor_ProfesorId",
                table: "Termini",
                column: "ProfesorId",
                principalTable: "Profesor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ucenik_Korisnici_Id",
                table: "Ucenik",
                column: "Id",
                principalTable: "Korisnici",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admini_Korisnici_Id",
                table: "Admini");

            migrationBuilder.DropForeignKey(
                name: "FK_Profesor_Korisnici_Id",
                table: "Profesor");

            migrationBuilder.DropForeignKey(
                name: "FK_Termini_Profesor_ProfesorId",
                table: "Termini");

            migrationBuilder.DropForeignKey(
                name: "FK_Ucenik_Korisnici_Id",
                table: "Ucenik");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Usluge",
                newName: "UslugaId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Ucenik",
                newName: "KorisnikID");

            migrationBuilder.RenameColumn(
                name: "ProfesorId",
                table: "Termini",
                newName: "ProfesorKorisnikID");

            migrationBuilder.RenameIndex(
                name: "IX_Termini_ProfesorId",
                table: "Termini",
                newName: "IX_Termini_ProfesorKorisnikID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Recenzije",
                newName: "RecenzijaId");

            migrationBuilder.RenameColumn(
                name: "ProsecnaOcena",
                table: "Profesor",
                newName: "Ocena");

            migrationBuilder.RenameColumn(
                name: "CenaPoSatu",
                table: "Profesor",
                newName: "Cena");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Profesor",
                newName: "KorisnikID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Korisnici",
                newName: "KorisnikID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Admini",
                newName: "KorisnikID");

            migrationBuilder.AddForeignKey(
                name: "FK_Admini_Korisnici_KorisnikID",
                table: "Admini",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "KorisnikID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Profesor_Korisnici_KorisnikID",
                table: "Profesor",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "KorisnikID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Termini_Profesor_ProfesorKorisnikID",
                table: "Termini",
                column: "ProfesorKorisnikID",
                principalTable: "Profesor",
                principalColumn: "KorisnikID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ucenik_Korisnici_KorisnikID",
                table: "Ucenik",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "KorisnikID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
