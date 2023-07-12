using FindProfessor.DataLayer;
using FindProfessor.DataLayer.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Repository
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        protected fpDbContext context;

        public Repository(fpDbContext context)
        {
            this.context = context;
        }

        public virtual T Add(T entity)
        {
            return this.context.Add(entity).Entity;
        }

        public virtual T Delete(T entity)
        {
            return this.context.Set<T>().Remove(entity).Entity;
        }

        public virtual IQueryable<T> All()
        {
            return this.context.Set<T>().AsNoTracking();
        }

        public virtual IQueryable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return this.context.Set<T>().AsNoTracking().AsQueryable().Where(predicate);
        }

        public virtual T Get(int id)
        {
            return this.context.Find<T>(id);
        }

        public virtual T Update(T entity)
        {
            return this.context.Update(entity).Entity;
        }

        public virtual void DeleteRange(List<T> entities)
        {
            this.context.Set<T>().RemoveRange(entities);
        }

        public virtual void UpdateRange(List<T> entities)
        {
            var entries = this.context.ChangeTracker.Entries().ToList();
            this.context.Set<T>().UpdateRange(entities);
        }

        public IQueryable<T> GetAllWithIncludes(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = context.Set<T>().Include(includes[0]);
            foreach (var include in includes.Skip(1))
            {
                query = query.Include(include);
            }
            return query;
        }

        public IQueryable<T> FindWithIncludes(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = context.Set<T>().Include(includes[0]);
            foreach (var include in includes.Skip(1))
            {
                query = query.Include(include);
            }
            return query.Where(predicate);
        }
    }
}
