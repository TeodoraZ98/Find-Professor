using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Repository.Interfaces
{
    public interface IRepository<T>
    {
        T Add(T entity);
        T Update(T entity);
        T Get(int id);
        T Delete(T entity);
        IQueryable<T> All();
        IQueryable<T> Find(Expression<Func<T, bool>> predicate);
        void DeleteRange(List<T> entities);
        void UpdateRange(List<T> entities);
        IQueryable<T> GetAllWithIncludes(Expression<Func<T, object>>[] includes);
        IQueryable<T> FindWithIncludes(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
    }
}
