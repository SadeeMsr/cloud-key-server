
export default async function prismaFindFirstWhere(params) {
    return await prisma.user.findFirst({
        where: params
    })
}