-- Завдання 6

-- Таблиця для каталогів 
CREATE TABLE IF NOT EXISTS public."Catalogs" (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "catalogName" VARCHAR(255) NOT NULL,
    CONSTRAINT "Catalogs_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Таблиця для розмов 
CREATE TABLE IF NOT EXISTS public."Conversations" (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця для учасників розмови 
CREATE TABLE IF NOT EXISTS public."ConversationParticipants" (
    id SERIAL PRIMARY KEY,
    "conversationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isBlacklisted" BOOLEAN DEFAULT FALSE,
    "isFavorited" BOOLEAN DEFAULT FALSE,
    CONSTRAINT "ConversationParticipants_conversationId_fkey" FOREIGN KEY ("conversationId")
        REFERENCES public."Conversations" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "ConversationParticipants_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Таблиця для повідомлень
CREATE TABLE IF NOT EXISTS public."Messages" (
    id SERIAL PRIMARY KEY,
    sender INTEGER NOT NULL,
    body TEXT NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Messages_conversationId_fkey" FOREIGN KEY ("conversationId")
        REFERENCES public."Conversations" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "Messages_sender_fkey" FOREIGN KEY (sender)
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS public."Messages" CASCADE;
DROP TABLE IF EXISTS public."Conversations" CASCADE;
DROP TABLE IF EXISTS public."ConversationParticipants" CASCADE;
DROP TABLE IF EXISTS public."Catalogs" CASCADE;