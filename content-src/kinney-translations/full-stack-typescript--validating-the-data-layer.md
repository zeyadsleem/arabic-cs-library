---
title: "التحقق من طبقة البيانات"
---

ما زلنا نضع ثقة كبيرة في طبقة قاعدة بياناتنا كذلك. وينبغي أن نتأكد من أنها تعيد إلينا ما نعتقد أنه هو.

هناك طرق عديدة لفعل ذلك، لكننا قد نبدأ بتجريد بسيط.

```typescript
class TaskClient {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getTasks({ completed }: { completed: boolean }) {
    const query = completed
      ? await this.database.prepare('SELECT * FROM tasks WHERE completed = 1')
      : await this.database.prepare('SELECT * FROM tasks WHERE completed = 0');

    return TasksSchema.parse(await query.all());
  }

  async getTask(id: number) {
    const query = await this.database.prepare('SELECT * FROM tasks WHERE id = ?');
    return TaskSchema.or(z.undefined()).parse(await query.get([id]));
  }

  async createTask({ task }: { task: NewTask }) {
    const query = await this.database.prepare(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
    );
    await query.run([task.title, task.description]);
  }

  async updateTask(id: number, task: NewTask) {
    const previous = TaskSchema.parse(await this.getTask(id));
    const updated = { ...previous, ...task };

    const query = await this.database.prepare(
      `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`,
    );

    await query.run([updated.title, updated.description, updated.completed, id]);
  }

  async deleteTask(id: number) {
    const query = await this.database.prepare('DELETE FROM tasks WHERE id = ?');
    await query.run([id]);
  }
}
```

## إضافة نموذج المهمة إلى طبقة API
