﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Models;

namespace api.Migrations
{
    [DbContext(typeof(ApiContext))]
    [Migration("20201018162435_paragraphs2")]
    partial class paragraphs2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0-rc.2.20475.6");

            modelBuilder.Entity("api.Models.Sentence", b =>
                {
                    b.Property<long>("SentenceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<string>("Arabic")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("English")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("TextId")
                        .HasColumnType("bigint");

                    b.HasKey("SentenceId");

                    b.HasIndex("TextId");

                    b.ToTable("Sentences");
                });

            modelBuilder.Entity("api.Models.Text", b =>
                {
                    b.Property<long>("TextId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<string>("ArabicParagraph")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("EnglishParagraph")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TextId");

                    b.ToTable("Texts");
                });

            modelBuilder.Entity("api.Models.Sentence", b =>
                {
                    b.HasOne("api.Models.Text", "Text")
                        .WithMany("Sentences")
                        .HasForeignKey("TextId");

                    b.Navigation("Text");
                });

            modelBuilder.Entity("api.Models.Text", b =>
                {
                    b.Navigation("Sentences");
                });
#pragma warning restore 612, 618
        }
    }
}
