import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ptBr from 'dayjs/locale/pt-br'

export const CommentList = () => {
  // dayjs.extend(customParseFormat)
  dayjs.extend(relativeTime)
  
  const mock = [
    {
      avatar: '',
      name: 'Julia Lima',
      date: '2023-06-06 14:03:12.983433',
      commentary:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      avatar: '',
      name: 'Marcos Antônio',
      date: '06-06-2023',
      commentary:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      avatar: '',
      name: 'Camila Silva',
      date: '01-05-2023',
      commentary:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      avatar: '',
      name: 'Marcos Antônio',
      date: '05-01-2023',
      commentary:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      avatar: '',
      name: 'Camila Silva',
      date: '01-05-2023',
      commentary:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
  ];


  return (
    <div className="py-9 px-11 rounded-s">
      <h2 className="heading-6-600 mb-5">Comentários</h2>
      <ul className="flex flex-col gap-5 max-h-[400px] overflow-y-auto mr-[-18px]">
        {mock && mock.length > 0 ? (
          mock.map((comment) => (
            <li>
              <div className="flex gap-5 items-center">
                <div className="bg-random-1 w-7 h-7 rounded-full">
                  {comment.avatar}
                </div>
                <p className="body-2-500">{comment.name}</p>
                <p className="text-grey-4">•</p>
                <p className="text-grey-3 body-2-400">
                  {dayjs(comment.date).locale(ptBr).fromNow()}
                </p>
              </div>
              <p className="text-grey-2 body-2-400 text-justify mt-4 mr-2">
                {comment.commentary}
              </p>
            </li>
          ))
        ) : (
          <p className="self-center heading-7-500 text-grey-3 bg-grey-7 rounded-full w-fit py-1 px-4 overflow-hidden">
            Ainda não há comentários sobre esse produto
          </p>
        )}
      </ul>
    </div>
  );
};
