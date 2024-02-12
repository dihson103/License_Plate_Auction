﻿// <auto-generated />
using System;
using AccountService.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AccountService.Migrations
{
    [DbContext(typeof(AccountDbContext))]
    partial class AccountDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AccountService.Entities.AdminAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("AccountService.Entities.Token", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdminAccountId")
                        .HasColumnType("integer");

                    b.Property<string>("CurrentPrivateKey")
                        .HasColumnType("text");

                    b.Property<bool>("IsAccescToken")
                        .HasColumnType("boolean");

                    b.Property<string>("JwtToken")
                        .HasColumnType("text");

                    b.Property<string>("UserAccountId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AdminAccountId");

                    b.HasIndex("UserAccountId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("AccountService.Entities.UserAccount", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<bool>("Status")
                        .HasColumnType("boolean");

                    b.Property<double>("Wallet")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AccountService.Entities.Token", b =>
                {
                    b.HasOne("AccountService.Entities.AdminAccount", "AdminAccount")
                        .WithMany("Tokens")
                        .HasForeignKey("AdminAccountId");

                    b.HasOne("AccountService.Entities.UserAccount", "UserAccount")
                        .WithMany("Tokens")
                        .HasForeignKey("UserAccountId");

                    b.Navigation("AdminAccount");

                    b.Navigation("UserAccount");
                });

            modelBuilder.Entity("AccountService.Entities.AdminAccount", b =>
                {
                    b.Navigation("Tokens");
                });

            modelBuilder.Entity("AccountService.Entities.UserAccount", b =>
                {
                    b.Navigation("Tokens");
                });
#pragma warning restore 612, 618
        }
    }
}