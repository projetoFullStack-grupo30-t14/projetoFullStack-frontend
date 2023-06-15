import { useState } from 'react';

export const NewComment = () => {
  const mock = { name: 'Samuel Leão', avatar: '' };
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <div className="py-9 px-11 bg-slate-100 rounded-[4px] bg-grey-whiteFixed">
        <div className="flex gap-5 items-center mb-4">
          <div className="bg-random-1 w-7 h-7 rounded-full">
            {mock.avatar}
          </div>
          <p className="body-2-500">{mock.name}</p>
        </div>
        <form className="relative">
          <textarea
            id="comment"
            placeholder="Digitar comentário"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-32 resize-none px-7 py-8 rounded-[4px] border-solid border-2 border-grey-7 placeholder:text-grey-3 text-gray-7 transition ease-in-out delay-300 outline-none focus:border-grey-3"
          />
          <button className="btn-medium bg-brand-1 text-grey-whiteFixed rounded p-5 font-semibold absolute bottom-5 right-4 transition ease-in-out delay-300 hover:bg-brand-2">
            Comentar
          </button>
        </form>
        <div className="space-x-4 space-y-2">
          <button
            className="bg-grey-7 text-grey-3 rounded-full h-7 px-3 font-medium"
            onClick={() => setInputValue('Gostei muito!')}
          >
            Gostei muito!
          </button>
          <button
            className="bg-grey-7 text-grey-3 rounded-full h-7 px-3 font-medium"
            onClick={() => setInputValue('Incrível!')}
          >
            Incrível!
          </button>
          <button
            className="bg-grey-7 text-grey-3 rounded-full h-7 px-3 font-medium"
            onClick={() =>
              setInputValue('Recomendarei para meus amigos!')
            }
          >
            Recomendarei para meus amigos!
          </button>
        </div>
      </div>
    </>
  );
};
