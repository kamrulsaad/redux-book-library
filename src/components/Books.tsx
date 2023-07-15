/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetBooksQuery } from "@/redux/features/book/bookApi"
import { IBook } from "@/types/book"
import BookCard from "./BookCard"

const Books = () => {

  const {data} = useGetBooksQuery(undefined)

  return (
    <div className='px-20 grid grid-cols-3 gap-x-20 gap-y-5 mb-4'>
      {
        data?.data.map((book: IBook) => (
          <BookCard book={book} key={book?._id}/>
        ))
      }
    </div>
  )
}

export default Books