import { db } from '@lib'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { z } from 'zod'

export async function loader(_: LoaderArgs) {
  const tasks = await db.task.findMany()
  return json(tasks)
}

const CreateSpec = z.object({
  title: z.string(),
})

const DeleteSpec = z.object({
  id: z.coerce.number(),
})

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const obj = Object.fromEntries(formData)

  if (request.method === 'DELETE') {
    const data = DeleteSpec.parse(obj)

    await db.task.delete({ where: data })
  } else {
    const data = CreateSpec.parse(obj)
    await db.task.create({ data })
  }
  return {}
}

export default function Index() {
  const tasks = useLoaderData<typeof loader>()

  return (
    <div className="container">
      <h1>Tasks</h1>
      <ul>
        <Form method="post">
          <input name="title" type="text" />
        </Form>
        {tasks.map((t) => (
          <li key={t.id}>
            <span>{t.title}</span>
            <Form method="delete">
              <input type="hidden" name="id" value={t.id} />
              <button type="submit" className="btn-error">
                Delete
              </button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  )
}
