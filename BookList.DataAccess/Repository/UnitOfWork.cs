﻿using BookList.DataAccess.Data;
using BookList.DataAccess.Repository.IRepository;
using BookList.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookList.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Category = new CategoryRepository(_context);
            SP_Call = new SP_Call(_context);
        }

        public ICategoryRepository Category { get; private set; }

        public ISP_Call SP_Call { get; private set; }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
