using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccessLayer.Entities
{
   public class Task
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Title { get; set; }
        public bool Complited { get; set; }
        public string PriorityId { get; set; }
        public string CategoryId { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
