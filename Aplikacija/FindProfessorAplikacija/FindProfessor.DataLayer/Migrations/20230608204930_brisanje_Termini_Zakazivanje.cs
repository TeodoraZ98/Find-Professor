using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FindProfessor.DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class brisanje_Termini_Zakazivanje : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Zakazivanja");

            migrationBuilder.DropTable(
                name: "Termini");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Termini",
                columns: table => new
                {
                    TerminId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfesorId = table.Column<int>(type: "int", nullable: false),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KrajnjeVreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PocetnoVreme = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Termini", x => x.TerminId);
                    table.ForeignKey(
                        name: "FK_Termini_Profesor_ProfesorId",
                        column: x => x.ProfesorId,
                        principalTable: "Profesor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Zakazivanja",
                columns: table => new
                {
                    ZakazivanjeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TerminId = table.Column<int>(type: "int", nullable: false),
                    UcenikId = table.Column<int>(type: "int", nullable: false),
                    ZakazanoTad = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zakazivanja", x => x.ZakazivanjeId);
                    table.ForeignKey(
                        name: "FK_Zakazivanja_Termini_TerminId",
                        column: x => x.TerminId,
                        principalTable: "Termini",
                        principalColumn: "TerminId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Zakazivanja_Ucenik_UcenikId",
                        column: x => x.UcenikId,
                        principalTable: "Ucenik",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Termini_ProfesorId",
                table: "Termini",
                column: "ProfesorId");

            migrationBuilder.CreateIndex(
                name: "IX_Zakazivanja_TerminId",
                table: "Zakazivanja",
                column: "TerminId");

            migrationBuilder.CreateIndex(
                name: "IX_Zakazivanja_UcenikId",
                table: "Zakazivanja",
                column: "UcenikId");
        }
    }
}
