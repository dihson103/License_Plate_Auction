using AccountService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccountService.Repositories
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication app)
        {
            var scope = app.Services.CreateScope();

            SeedData(scope.ServiceProvider.GetService<AccountDbContext>());
        }

        private static void SeedData(AccountDbContext context)
        {
            context.Database.Migrate();

            if(context.Admins.Any())
            {
                Console.WriteLine("Already has admin data.");
            }
            else
            {
                var admins = new List<AdminAccount>
                {
                    new AdminAccount
                    {
                        Email = "dinhson1032001@gmail.com",
                        FullName = "Nguyễn Đình Sơn",
                        Password = "12345"
                    },
                    new AdminAccount
                    {
                        Email = "nkhuyen@gmail.com",
                        FullName = "Nguyễn Khánh Huyền",
                        Password = "12345"
                    },
                    new AdminAccount
                    {
                        Email = "chuthuylinh@gmail.com",
                        FullName = "Chu Thùy Linh",
                        Password = "12345"
                    },
                    new AdminAccount
                    {
                        Email = "maint@gmail.com",
                        FullName = "Nguyễn Thị Mai",
                        Password = "12345"
                    },
                    new AdminAccount
                    {
                        Email = "linhlinh@gmail.com",
                        FullName = "Nguyễn Thị Linh",
                        Password = "12345"
                    }
                };

                context.Admins.AddRange(admins);
                context.SaveChanges();
            }
        }
    }
}
