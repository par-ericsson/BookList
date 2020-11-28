﻿using BookList.DataAccess.Data;
using BookList.DataAccess.Repository.IRepository;
using BookList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookList.DataAccess.Repository
{
    public class ShoppingCartRepository : Repository<ShoppingCart>, IShoppingCartRepository
    {
        private readonly ApplicationDbContext _db;

        public ShoppingCartRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(ShoppingCart obj)
        {
            _db.Update(obj);
        }
    }
}
