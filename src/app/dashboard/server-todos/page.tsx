export const dynamicParams = true; // true | false,
export const revalidate = 0;
import { getUserSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/inex";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Listado de todos',
    description: 'Listado de todos',
};

export default async function ServerTodosPage() {

    const user = await getUserSession();

    if (!user) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({
        where: { userId: user.id },
        orderBy: { description: 'asc' }
    })

    return (
        <>

            <span className="text-3xl mb-10">Server Actions</span>

            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />

            </div>
            <TodosGrid todos={todos} />
        </>
    );
}